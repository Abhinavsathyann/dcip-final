import { useState } from "react";
import { X, Calendar, Users, Sparkles } from "lucide-react";

export default function Apply() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background animation elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <Sparkles size={16} className="text-yellow-300" />
            <span className="text-white text-sm font-semibold">
              Limited Seats Available
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Transform Your Career?
          </h2>

          <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-12">
            Join thousands of interns who have successfully launched their tech
            careers through DCIP Malappuram.
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="btn-glow px-10 py-4 text-lg font-bold shadow-2xl hover:shadow-primary/50 animate-pulse-glow"
          >
            Apply Now
          </button>

          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="glass-effect p-6 rounded-xl text-white">
              <Calendar size={32} className="text-yellow-300 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Next Batch</h3>
              <p className="text-gray-300 text-sm">Starts March 2024</p>
            </div>

            <div className="glass-effect p-6 rounded-xl text-white">
              <Users size={32} className="text-blue-300 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Intake</h3>
              <p className="text-gray-300 text-sm">50-100 Interns per batch</p>
            </div>

            <div className="glass-effect p-6 rounded-xl text-white">
              <Sparkles size={32} className="text-purple-300 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Success Rate</h3>
              <p className="text-gray-300 text-sm">95% Placement Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-8 animate-scale-in relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Close"
            >
              <X size={24} className="text-foreground" />
            </button>

            {/* Content */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Next Batch Information
              </h2>
              <p className="text-muted-foreground">
                Important details about the upcoming internship batch
              </p>
            </div>

            <div className="space-y-6">
              {/* Coming soon card */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 text-center border-2 border-primary/20">
                <Calendar size={48} className="text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Coming Soon
                </h3>
                <p className="text-lg font-semibold text-primary mb-2">
                  Expected Start Date: March 2024
                </p>
                <p className="text-muted-foreground">
                  Applications will open shortly. Be among the first to apply!
                </p>
              </div>

              {/* Eligibility section */}
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Eligibility Criteria
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">✓</span>
                    <span>
                      Currently pursuing or recently completed B.Tech/MCA in
                      Computer Science, IT, or related fields
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">✓</span>
                    <span>
                      Basic knowledge of programming (C, C++, Java, or Python)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">✓</span>
                    <span>Passionate about learning and self-improvement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">✓</span>
                    <span>Ability to commit 3-6 months to the program</span>
                  </li>
                </ul>
              </div>

              {/* Application process */}
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Application Process
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        Online Application
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Fill the application form with your details
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        Technical Assessment
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Complete online coding assessment
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        Technical Interview
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Discussion on your technical knowledge
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        HR Interview
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Final round with HR team
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits section */}
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Program Benefits
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>Monthly Stipend</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>Industry Mentorship</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>Real-World Projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>Placement Assistance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>Certificate of Completion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>Networking Opportunities</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gray-50 p-6 rounded-xl text-center">
                <p className="text-muted-foreground mb-4">
                  Check back soon for application opening or subscribe to our
                  newsletter
                </p>
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button className="btn-glow px-6">Notify Me</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
